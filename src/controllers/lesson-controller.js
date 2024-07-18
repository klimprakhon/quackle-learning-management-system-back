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

    console.log(req.body, "try my best");
    // parse JSON data from lesson field
    const lessons = JSON.parse(req.body.lessons);

    console.log(req.files, "kkkkk");

    // validate lessons content (name, topicId, attachment)
    for (const lesson of lessons) {
      console.log(lesson, "lesson");
      if (!lesson.name || !lesson.topicId) {
        return res.status(400).json({
          message: "Each lesson must have name and topicId",
        });
      }
    }

    console.log(req.files, "jjjj");
    // upload files to cloudinary
    const uploadPromises = req.files.map(async (file) => {
      const attachmentUrl = await uploadService.upload(file.path);
      return { filename: file.originalname, attachmentUrl };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // console.log(uploadedFiles, "hello");

    // Map uploaded files to their original names for easy lookup
    const uploadedFilesMap = uploadedFiles.reduce((acc, file) => {
      acc[file.filename] = file.attachmentUrl;
      return acc;
    }, {});

    // deal with file upload and plain text in the attachment
    const lessonInfo = lessons.map((lesson, index) => {
      if (
        lesson.attachmentType === "pdf" &&
        uploadedFilesMap[lesson.attachment]
      ) {
        return {
          lessonName: lesson.name,
          topicId: lesson.topicId,
          attachment: uploadedFilesMap[lesson.attachment],
          // attachment: uploadedFiles[index]?.attachmentUrl || lesson.attachment,
        };
      } else if (lesson.attachmentType === "description") {
        return {
          lessonName: lesson.name,
          topicId: lesson.topicId,
          attachment: lesson.attachment, // for text description
        };
      } else {
        return {
          lessonName: lesson.name,
          topicId: lesson.topicId,
          attachment: null, // No attachment
        };
      }
    });

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

// lessonController.getAllDetails = async (req, res, next) => {
//   try {
//     const data = req.body;

//     const courseId = +data.courseId;

//     const courseDetails = await lessonService.getAllDetails(courseId);

//     res.status(200).json(courseDetails);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = lessonController;
