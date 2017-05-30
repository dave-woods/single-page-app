const fs = require('fs')
const DOMParser = require('xmldom').DOMParser

exports.handleTML = async (req, res) => {
  fs.readFile(req.params.file, 'utf8', (err, data) => {
    if (err) {
      res.json({e: err.message})
      return
    }
    const parser = new DOMParser()
    const xml = parser.parseFromString(data, 'text/xml')
    const tlinks = xml.getElementsByTagName('TLINK')
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
