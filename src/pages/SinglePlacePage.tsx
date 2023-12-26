
export function SinglePlacePage() {
    const id = window.location.pathname.split('/').pop();
    alert(id);
    return (
        <>
            <h1>SinglePlacePage</h1>
        </>
    )
}