"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { FormEvent } from "react";

interface FormData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  prerequisites: string;
  fees: string;
}

interface EditFormProps {
  data: FormData;
  editFormDisplayHandle: () => void;
}

const EditCourseForm: React.FC<EditFormProps> = ({
  data,
  editFormDisplayHandle,
}) => {
  const { _id, title, subtitle, description, prerequisites, fees } = data;
  // const [updateData, setUpdateData] = useState<FormData | null>(null);

  // To use the react hook form for form data validation
  // Only field level validation is done, schema level is excluded in this code
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Main function to update the form data - sending PUT request to the API
  const updateFormData = async (data: FormData) => {
    console.log(_id);
    if (!data) {
      console.log("data for the update not received yet");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5002/courses/update/${_id}`,
        data
      );
      console.log(res.data);
      editFormDisplayHandle();
    } catch (error) {
      console.error(error);
    }
  };

  // This is called after the form is submitted - it then calls the form update function defined above
  const editCourseHandle = async (
    data: FormData,
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Data updated in edit form");
    console.log(data);
    // setUpdateData(data);
    updateFormData(data);
  };

  return (
    <>
      {!data ? null : (
        <div className="card mt-4">
          <h4>Edit course</h4>
          <p>{data.title}</p>
          <form
            className="w-full mt-8 mb-8"
            onSubmit={handleSubmit(editCourseHandle)}
          >
            <div className="form-group edit-course-form">
              <div className="form-control w-full flex-row">
                <input
                  {...register("title", {
                    // onChange: (event) => setEditCourseData(event.target.value),
                    value: title,
                    required: "Title is required",
                    minLength: {
                      value: 15,
                      message: "Title must be at least 15 characters long",
                    },
                    maxLength: {
                      value: 80,
                      message: "Title must not be more than 80 characters long",
                    },
                  })}
                  type="text"
                  id="title"
                  autoComplete="off"
                  placeholder="Enter course title"
                  className="w-5/6 p-1 mb-2"
                />
                {errors.title && (
                  <p className="form-error-msg">{errors.title.message}</p>
                )}
              </div>
              <div className="form-control flex-row">
                <input
                  {...register("subtitle", {
                    // onChange: (event) => setEditSubtitle(event.target.value),
                    value: subtitle,
                    required: "Sub-title is required",
                    minLength: {
                      value: 15,
                      message: "Sub-title must be at least 15 characters long",
                    },
                    maxLength: {
                      value: 80,
                      message:
                        "Sub-title must not be more than 80 characters long",
                    },
                  })}
                  type="text"
                  id="subtitle"
                  autoComplete="off"
                  placeholder="Enter course sub title"
                  className="w-5/6 p-1 mb-2"
                />

                {errors.subtitle && (
                  <p className="form-error-msg">{errors.subtitle.message}</p>
                )}
              </div>
              <div className="form-control flex-row">
                <textarea
                  {...register("description", {
                    // onChange: (event) => setEditDescription(event.target.value),
                    value: description,
                    required: "Description is required",
                    minLength: {
                      value: 200,
                      message:
                        "Description must be at least 200 characters long",
                    },
                    maxLength: {
                      value: 800,
                      message:
                        "Description must not be more than 800 characters long",
                    },
                  })}
                  id="description"
                  rows={4}
                  placeholder="Enter course description"
                  className="w-5/6 p-1 mb-2 custom-text-area"
                />
                {errors.description && (
                  <p className="form-error-msg">{errors.description.message}</p>
                )}
              </div>
              <div className="form-control">
                <textarea
                  {...register("prerequisites", {
                    // onChange: (event) => setEditPrerequisites(event.target.value),
                    value: prerequisites,
                    required: "Description is required",
                    minLength: {
                      value: 200,
                      message:
                        "Description must be at least 200 characters long",
                    },
                    maxLength: {
                      value: 800,
                      message:
                        "Description must not be more than 800 characters long",
                    },
                  })}
                  id="prerequisites"
                  rows={4}
                  placeholder="Enter course prerequisites"
                  className="w-5/6 p-1 mb-2 custom-text-area"
                />
                {errors.prerequisites && (
                  <p className="form-error-msg">
                    {errors.prerequisites.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <input
                  {...register("fees", {
                    // onChange: (event) => setEditFees(event.target.value),
                    value: fees,
                    required: "Fees is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter numbers only",
                    },
                  })}
                  type="number"
                  id="fees"
                  autoComplete="off"
                  placeholder="Enter course fees"
                  className="w-5/6 p-1 mb-2"
                />
                {errors.fees && (
                  <p className="form-error-msg">{errors.fees.message}</p>
                )}
              </div>
              <div className="form-control">
                <button type="submit" className="btn btn-blue mt-2">
                  Submit
                </button>
                <button
                  className="btn btn-red mt-2 ml-2"
                  onClick={editFormDisplayHandle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditCourseForm;
