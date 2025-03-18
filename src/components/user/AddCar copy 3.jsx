import CarForm from "../forms/CarForm";

const INITIAL_VALUES = {
    title: "",
    brand: "",
    year: "",
    mileage: "",
    transmission: "",
    bodyStyle: "",
    startingPrice: "",
    description: "",
    images: [],
};

export default function AddCar() {
    const handleSubmit = (values) => {
        console.log("Submitted values:", values);
        // Add your API call here
    };

    return (
        <CarForm
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            isEditing={false}
        />
    );
}
