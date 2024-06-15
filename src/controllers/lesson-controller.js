const lessonService = require("../services/lesson-service");
const uploadService = require("../services/upload-service");
const fs = require("fs");
const lessonController = {};

lessonController.createLessons = async (req, res, next) => {
  try {
    // req === form-data
    if (!req.files) {
      return res.status(400).json({ message: "attachment is required" });
    }

    // parse JSON data from lesson field
    const lessons = JSON.parse(req.body.lessons);

    // validate lessons content (name, topicId, attachment)
    for (const lesson of lessons) {
      if (!lesson.name || !lesson.topicId || !lesson.attachment) {
        return res.status(400).json({
          message: "Each lesson must have name, topicId, and attachment",
        });
      }
    }

    // upload files to cloudinary
    const uploadPromises = req.files.map(async (file) => {
      const attachmentUrl = await uploadService.upload(file.path);
      return { filename: file.originalname, attachmentUrl };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    const lessonInfo = lessons.map((lesson, index) => ({
      name: lesson.name,
      topicId: lesson.topicId,
      attachment: uploadedFiles[index].attachmentUrl,
    }));

    // inject to database
    const createdLessons = await lessonService.createLessons(lessonInfo);

    res.status(200).json(createdLessons);
  } catch (error) {
    next(error);
  } finally {
    req.files.forEach((file) => {
      fs.unlink(file.path, (error) => {
        if (error) {
          console.log(error);
        }
      });
    });
  }
};

module.exports = lessonController;
