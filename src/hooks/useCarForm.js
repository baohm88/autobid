import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
    year_model: yup.string().required("Year is required"),
    make: yup.string().required("Make is required"),
    model: yup.string().required("Model is required"),
    transmission: yup.string().required("Transmission is required"),
    mileage: yup.number().required("Mileage is required"),
    engine: yup.string().required("Engine is required"),
    body_style: yup.string().required("Body style is required"),
    interial_color: yup.string().required("Interior color is required"),
    exterior_color: yup.string().required("Exterior color is required"),
    starting_bid: yup.number().required("Starting bid is required"),
    start_time: yup.date().required("Start time is required"),
    end_time: yup.date().required("End time is required"),
    equipment: yup.string().required("Equipment is required"),
    modified: yup.string(),
    modifications: yup.string(),
    flaw: yup.string(),
    flaws: yup.string(),
});

export default function useCarForm(initialValues, onSubmit) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return formik;
}
