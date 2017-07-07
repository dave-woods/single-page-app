const fs = require('fs')
const DOMParser = require('xmldom').DOMParser

exports.handleTML = (fileloc) => async (req, res) => {
  fs.readFile(fileloc + req.params.file, 'utf8', (err, data) => {
    if (err) {
      res.json({error: err.message})
      return
    } else if (!/^<\?\s*xml version\s*=\s*"1.0"\s*\?>\s*<TimeML/.test(data)) {
      res.json({error: 'The file doesn\'t seem to be a valid TimeML file. Is it tagged correctly?'})
      return
    }
    const parser = new DOMParser()
    const xml = parser.parseFromString(data, 'text/xml')
    const tlinks = xml.getElementsByTagName('TLINK')
    if (!tlinks || !tlinks.length) {
      res.json({error: 'No TLINKs found'})
      return
    }
    const mapped = Array.prototype.map.call(tlinks, tl => {
      const reduced = Array.prototype.reduce.call(tl.attributes, (acc, att) => {
        // ignore signalling for now
        if (att.name !== 'signalID') {
          acc[att.name] = att.value
        }
        return acc
      }, {})
      const strings = fetchRel((reduced.eventInstanceID || reduced.timeID), (reduced.relatedToEventInstance || reduced.relatedToTime), reduced.relType)
      if (!strings.error) {
        reduced.str = strings.allenString
        reduced.estr = strings.eventString
      }
      return reduced
    })
    const stats = mapped.reduce((acc, tl) => {
      const ei = tl.eventInstanceID
      const rei = tl.relatedToEventInstance
      const t = tl.timeID
      const rt = tl.relatedToTime
      const updateAcc = (a, l, x) => {
        if (a[l][x]) {
          a[l][x] += 1
        } else {
          a[l][x] = 1
        }
        if (!a.mostFrequent || (a[l][x] > a.mostFrequent.count)) {
          a.mostFrequent = {
            id: x,
            count: a[l][x]
          }
        }
      }
      if (ei) {
        updateAcc(acc, 'eventInstanceIDs', ei)
      } else if (t) {
        updateAcc(acc, 'timeIDs', t)
      }
      if (rei) {
        updateAcc(acc, 'eventInstanceIDs', rei)
      } else if (rt) {
        updateAcc(acc, 'timeIDs', rt)
      }
      return acc
    }, {timeIDs: {}, eventInstanceIDs: {}})
    res.json({
      length: mapped.length,
      tlinks: mapped,
      strs: mapped.map(tl => tl.str),
      estrs: mapped.map(tl => tl.estr),
      stats,
      xml: data,
      text: xml.documentElement.textContent.trim()
    })
  })
}

const fetchRel = (e1, e2, rel) => {
  switch (rel) {
    case 'BEFORE':
      return {
        allenString: e1 + ' < ' + e2,
        eventString: '|`' + e1 + '`||`' + e2 + '`|'
      }
    case 'AFTER':
      return {
        allenString: e1 + ' > ' + e2,
        eventString: '|`' + e2 + '`||`' + e1 + '`|'
      }
    case 'INCLUDES':
    case 'DURING_INV':
      return {
        allenString: e1 + ' di ' + e2,
        eventString: '|`' + e1 + '`|`' + e1 + '``' + e2 + '`|`' + e1 + '`|'
      }
    case 'IS_INCLUDED':
    case 'DURING':
      return {
        allenString: e1 + ' d ' + e2,
        eventString: '|`' + e2 + '`|`' + e1 + '``' + e2 + '`|`' + e2 + '`|'
      }
    case 'SIMULTANEOUS':
    case 'IDENTITY':
      return {
        allenString: e1 + ' = ' + e2,
        eventString: '|`' + e1 + '``' + e2 + '`|'
      }
    case 'IAFTER':
      return {
        allenString: e1 + ' mi ' + e2,
        eventString: '|`' + e2 + '`|`' + e1 + '`|'
      }
    case 'IBEFORE':
      return {
        allenString: e1 + ' m ' + e2,
        eventString: '|`' + e1 + '`|`' + e2 + '`|'
      }
    case 'BEGINS':
      return {
        allenString: e1 + ' s ' + e2,
        eventString: '|`' + e1 + '``' + e2 + '`|`' + e2 + '`|'
      }
    case 'ENDS':
      return {
        allenString: e1 + ' f ' + e2,
        eventString: '|`' + e2 + '`|`' + e1 + '``' + e2 + '`|'
      }
    case 'BEGUN_BY':
      return {
        allenString: e1 + ' si ' + e2,
        eventString: '|`' + e1 + '``' + e2 + '`|`' + e1 + '`|'
      }
    case 'ENDED_BY':
      return {
        allenString: e1 + ' fi ' + e2,
        eventString: '|`' + e1 + '`|`' + e1 + '``' + e2 + '`|'
      }
    default:
      return {
        error: 'Unknown relation'
      }
  }
}
