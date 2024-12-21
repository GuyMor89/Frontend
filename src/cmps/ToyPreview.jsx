

export function ToyPreview({toy}) {

    return <>
        <h4>{toy.name}</h4>
        <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${toy._id}`}></img>
        <p>Price: <span>{toy.price}</span></p>
    </>
}