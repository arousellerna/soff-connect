import { describe, it, expect } from "vitest";

interface Lesson {
  id: string;
  module_id: string;
  title: string;
}

function getLessonsByModuleOriginal(lessonsData: Lesson[], moduleId: string) {
  return lessonsData?.filter(lesson => lesson.module_id === moduleId) || [];
}

function getLessonsByModuleOptimized(lessonsByModule: Record<string, Lesson[]>, moduleId: string) {
  return lessonsByModule[moduleId] || [];
}

describe("Education optimization", () => {
  const lessonsData: Lesson[] = [
    { id: "1", module_id: "mod1", title: "Lesson 1" },
    { id: "2", module_id: "mod1", title: "Lesson 2" },
    { id: "3", module_id: "mod2", title: "Lesson 3" },
  ];

  const lessonsByModule = lessonsData.reduce((acc, lesson) => {
    if (!acc[lesson.module_id]) {
      acc[lesson.module_id] = [];
    }
    acc[lesson.module_id].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  it("should return the same lessons for both approaches", () => {
    const moduleId = "mod1";
    const originalResult = getLessonsByModuleOriginal(lessonsData, moduleId);
    const optimizedResult = getLessonsByModuleOptimized(lessonsByModule, moduleId);

    expect(originalResult).toEqual(optimizedResult);
    expect(optimizedResult.length).toBe(2);
    expect(optimizedResult[0].id).toBe("1");
    expect(optimizedResult[1].id).toBe("2");
  });

  it("should handle empty results correctly", () => {
    const moduleId = "nonexistent";
    const originalResult = getLessonsByModuleOriginal(lessonsData, moduleId);
    const optimizedResult = getLessonsByModuleOptimized(lessonsByModule, moduleId);

    expect(originalResult).toEqual(optimizedResult);
    expect(optimizedResult).toEqual([]);
  });
});
