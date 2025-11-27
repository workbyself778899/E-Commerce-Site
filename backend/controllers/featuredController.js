const Featured = require('../models/featured')

const getFeatured = async (req, res) => {
  try {
    const doc = await Featured.findOne().populate('topPicks').populate('hereTable')
    if (!doc) return res.json({ topPicks: [], hereTable: [] })
    res.json({ topPicks: doc.topPicks, hereTable: doc.hereTable })
  } catch (error) {
    console.error('getFeatured error:', error)
    res.status(500).json({ message: 'Error fetching featured', error: error.message })
  }
}

const addFeatured = async (req, res) => {
  try {
    const { section, productId } = req.body
    if (!['topPicks', 'hereTable'].includes(section)) return res.status(400).json({ message: 'Invalid section' })

    let doc = await Featured.findOne()
    if (!doc) {
      doc = new Featured({ topPicks: [], hereTable: [] })
    }

    const arr = doc[section]
    if (!arr.map(String).includes(String(productId))) {
      arr.push(productId)
      await doc.save()
    }

    const populated = await Featured.findById(doc._id).populate('topPicks').populate('hereTable')
    res.json({ message: 'Added', featured: populated })
  } catch (error) {
    console.error('addFeatured error:', error)
    res.status(500).json({ message: 'Error adding featured', error: error.message })
  }
}

const removeFeatured = async (req, res) => {
  try {
    const { section, productId } = req.params
    if (!['topPicks', 'hereTable'].includes(section)) return res.status(400).json({ message: 'Invalid section' })

    const doc = await Featured.findOne()
    if (!doc) return res.status(404).json({ message: 'Featured not found' })

    doc[section] = doc[section].filter(id => String(id) !== String(productId))
    await doc.save()
    const populated = await Featured.findById(doc._id).populate('topPicks').populate('hereTable')
    res.json({ message: 'Removed', featured: populated })
  } catch (error) {
    console.error('removeFeatured error:', error)
    res.status(500).json({ message: 'Error removing featured', error: error.message })
  }
}

module.exports = { getFeatured, addFeatured, removeFeatured }
