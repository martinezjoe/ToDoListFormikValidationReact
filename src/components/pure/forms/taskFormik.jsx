import React from "react";
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Models

import { LEVELS } from "../../../models/levels.enum";
import { Task } from "../../../models/task.class";

const TaskFormik = ({ add, length }) => {
  const initialValues = {
    name: "",
    description: "",
    completed: false,
    level: LEVELS.NORMAL,
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Task Title too short")
      .max(20, "Task Title too long")
      .required("Task Title is required"),
    description: Yup.string()
      .min(4, "Description too short")
      .max(80, "Description too long")
      .required("Description is required"),
    level: Yup.string().required("Level is required, choose one"),
  });

  function addContact(value) {
    const newTask = new Task(
      value.name,
      value.description,
      value.completed,
      value.level
    );

    add(newTask);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        //* Yup Validation Shema
        validationSchema={contactSchema}
        //* onSubmit Event
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          addContact(values);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <div className="d-flex justify-content-center align-items-center mb-4">
            <Form className="form-outline flex-fill">
              <Field
                id="name"
                type="text"
                name="name"
                placeholder="Task Title "
                className="form-control form-control-log"
              />

              {/* Task Title Errors */}

              {errors.name && touched.name && (
                <ErrorMessage name="name" component="div" />
              )}

              <Field
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                className="form-control form-control-log"
              />

              {/* Description Errors */}

              {errors.description && touched.description && (
                <ErrorMessage name="description" component="div" />
              )}

              <Field
                as="select"
                name="level"
                className="form-control form-control-log"
              >
                <option value={LEVELS.NORMAL}> Normal</option>
                <option value={LEVELS.URGENT}> Urgent </option>
                <option value={LEVELS.BLOCKING}> Blocking </option>
              </Field>

              {/* Level Errors */}

              {errors.level && touched.level && (
                <ErrorMessage name="level" component="div" />
              )}

              <button type="submit" className="btn btn-success btn-lg ms-2">
                {length > 0 ? "Add Task" : "Create your first task"}
              </button>
              {isSubmitting ? <p> Adding new task... </p> : null}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

TaskFormik.propTypes = {
  add: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
};

export default TaskFormik;
