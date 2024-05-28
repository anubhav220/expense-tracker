
export default function Input({colorValue,setColorValue}){
    return (
    <form onSubmit={(e)=>e.preventDefault()}>
    <level>Add Color name:</level>
    <input
    autoFocus
    type="text"
    placeholder="Type color name"
    required
    value={colorValue}
    onChange={(e) => setColorValue(e.target.value)}
    />
    </form>
    );
}