type Video = {
  title: string;
  file: File | null;
};

type CourseData = {
  title: string;
  description: string;
  price: string;
  category: string;
  thumbnail: File | null;
  videos: Video[];
};

export const validateCourseForm = (data: CourseData) => {
  const errors: string[] = [];

  if (!data.title.trim()) {
    errors.push("Title is required.");
  }

  if (!data.price.trim() || isNaN(Number(data.price)) || Number(data.price) <= 0) {
    errors.push("Price must be a valid positive number.");
  }

  if (!data.category.trim()) {
    errors.push("Category is required.");
  }

  if (!data.thumbnail) {
    errors.push("Thumbnail image is required.");
  }

  if (data.videos.length === 0) {
    errors.push("At least one video is required.");
  } else {
    data.videos.forEach((video, index) => {
      if (video.title.trim() && !video.file) {
        errors.push(`Video file is required for video titled "${video.title}" (video #${index + 1}).`);
      }
      if (!video.title.trim() && video.file) {
        errors.push(`Title is required for video file "${video.file.name}" (video #${index + 1}).`);
      }
    });
  }

  return errors;
};


