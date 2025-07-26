export async function createOrderId(courseId: string): Promise<string> {
    try {
        const response = await fetch("/api/course/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseId: courseId, 
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
            throw new Error(errorData.message || `Failed to create order: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Order Response:", data);

        if (!data.orderId) {
            throw new Error("Backend did not return an orderId.");
        }

        return data.orderId;
    } catch (error: any) {
        console.error("Error in createOrderId:", error);
        throw new Error(`Failed to initiate payment: ${error.message || "Please try again."}`);
    }
}