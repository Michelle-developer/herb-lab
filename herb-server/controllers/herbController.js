const fs = require('fs');

const herbs = JSON.parse(fs.readFileSync(`${__dirname}/../data/herbsData.json`));

exports.getAllHerbs = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: herbs.length,
    data: {
      herbs,
    },
  });
};

// app.get('/api/herbs', (req, res) => {
//   res.json(herbs);
// });

exports.getHerb = (req, res) => {
  console.log(req.params);
  const slug = req.params.slug;
  const herb = herbs.find((el) => el.slug === slug);

  res.status(200).json({
    status: 'success',
    data: {
      herb,
    },
  });
};

// app.get('/api/herbs/:slug', (req, res) => {
//   const slug = req.params.slug;
//   const herb = herbs.find((el) => el.slug === slug);
//   res.json(herb);
// });
