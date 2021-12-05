exports.developer_verification = (req, res, next) => {
  try {
    const devToken = req.headers.authorization;
    console.log(devToken);

    if (devToken == process.env.DEV_SECRET) {
      next();
    } else {
      return res.status(401).json({
        titel: 'Developer verification',
        success: false,
        message:
          'Developer verification failed. Please provide correct credentials. ' +
          err.message,
      });
    }
  } catch (err) {
    res.status(401).json({
      titel: 'Developer verification',
      success: false,
      message:
        'Developer verification failed. Please provide correct credentials.',
    });
  }
};
