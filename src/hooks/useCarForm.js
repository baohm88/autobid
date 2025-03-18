import { useFormik } from "formik";
import * as yup from "yup";

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
    end_time: yup
        .date()
        .required("End time is required")
        .test(
            "min-duration",
            "End time must be at least 1 day after start time",
            function (value) {
                const { start_time } = this.parent;
                if (!start_time || !value) return true;
                const diffInMs = value - start_time;
                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                return diffInDays >= 1;
            }
        ),
    equipment: yup.string(),
    modified: yup.string(),
    modifications: yup.string().when("modified", {
        is: (value) => value === "Modified",
        then: yup.string().required("Please list the modifications"),
    }),
    flaw: yup.string(),
    flaws: yup.string().when("flaw", {
        is: (value) => value === "Yes",
        then: yup.string().required("Please list the flaws"),
    }),
});

export default function useCarForm(initialValues, onSubmit) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    return formik;
}
