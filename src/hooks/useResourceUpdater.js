import { useEffect } from 'react';

const useResourceUpdater = (resources, courses, setResources) => {
    useEffect(() => {
        const updatedResources = resources.map(resource => {
            const course = courses.find(course => course.id === resource.courseId);
            if (course) {
                return {
                    ...resource,
                    course: course.title,
                    paid: course.paid ? '✔' : '✕',
                    courseRemaining: course.quantity,
                    teacherMoney: course.teachMoney,
                    price: resource.pricePerLesson * resource.courseConducted
                };
            }
            return resource;
        });
        setResources(updatedResources);
    }, []);
};

export default useResourceUpdater;
