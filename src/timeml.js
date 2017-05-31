const fs = require('fs')
const DOMParser = require('xmldom').DOMParser

exports.handleTML = async (req, res) => {
  fs.readFile('tmp/uploads/' + req.params.file, 'utf8', (err, data) => {
    if (err) {
      res.json({error: err.message})
      return
    } else if (!data.startsWith('<?xml version="1.0"?><TimeML')) {
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
    const strs = mapped.map(tl => tl.str)
    res.json({
      len: strs.length,
      tlinks: mapped,
      strs
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
