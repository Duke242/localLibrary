export default function NewBook() {
    return (
        <form action="/api/book" method="POST">
            <input name="author" placeholder="Author"></input>
            <input name="title" placeholder="Title"></input>
            <button>Create</button>
        </form>
    )
}