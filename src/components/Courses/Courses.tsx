import { getCourses } from "@site/src/utils/useCourses";

import styles from "./courses.module.css";

export default function Courses() {
  const { courses } = getCourses();

  return (
    <div className={styles.courses}>
      <div className={styles.coursesGrid}>
        {
          courses.map(course => {
            if (course.id === 'placeholder') return;

            return (
              <div className={styles.courseCard} key={course.id}>
                <div className={styles.courseCardImg}>
                  <img src={course.image} alt='' />
                </div>
                <div className={styles.courseCardBody}>
                  <h4>{course.title}</h4>
                  <p>{course.desc}</p>
                  <a href={course.link}>Start Learning</a>
                </div>
              </div>
            )
          })
        }
        <div className={styles.coursePlaceholder}>comming soon</div>
      </div>
    </div>
  );
}
