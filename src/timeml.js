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
      reduced.str = '' + (reduced.eventInstanceID || reduced.timeID) + ' ' + fetchRel[reduced.relType] + ' ' + (reduced.relatedToEventInstance || reduced.relatedToTime)
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
    const strs = mapped.map(tl => tl.str)
    res.json({
      length: strs.length,
      tlinks: mapped,
      strs,
      stats,
      xml: data,
      text: xml.documentElement.textContent.trim()
    })
  })
}

const fetchRel = {
  'BEFORE': '<',
  'AFTER': '>',
  'INCLUDES': 'di',
  'IS_INCLUDED': 'd',
  'DURING': 'd',
  'DURING_INV': 'di',
  'SIMULTANEOUS': '=',
  'IAFTER': 'mi',
  'IBEFORE': 'm',
  'IDENTITY': '=',
  'BEGINS': 's',
  'ENDS': 'f',
  'BEGUN_BY': 'si',
  'ENDED_BY': 'fi'
}
