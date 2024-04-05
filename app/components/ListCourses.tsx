"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Course from "./Course";

interface CourseProp {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  prerequisites: string;
  fees: string;
}

interface EditFormDisplayProp {
  editFormDisplayHandle: () => void;
}

const ListCourses: React.FC<EditFormDisplayProp> = ({
  editFormDisplayHandle,
}) => {
  const [courses, setCourses] = useState<CourseProp[] | null>(null);

  // To list all the courses
  const getAllCourses = async () => {
    const res = await axios.get("http://localhost:5002/courses");
    if (!res) {
      console.log("Courses not found");
      alert("No item found!");
      return;
    }
    console.log(res.data);
    setCourses(res.data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      {!courses ? (
        <div className="card">
          <p className="text-center">Courses not found!</p>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-2">All Courses</h1>

          {/* To reverse the list - most recent at the top */}
          {courses
            .slice(0)
            .reverse()
            .map((course, index) => {
              return (
                <Course
                  itemId={course._id}
                  index={index}
                  item_title={course.title}
                  item_subtitle={course.subtitle}
                  editFormDisplayHandle={editFormDisplayHandle}
                />
              );
            })}
        </>
      )}
    </>
  );
};

export default ListCourses;
