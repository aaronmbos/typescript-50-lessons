type Result = {
    title: string;
    url: string;
    abstract: string;
};

function search(
    query: string,
    callback: (results: Result[]) => void,
    tags?: string[]
) {
    let queryString = `?query=${query}`;

    if (tags && tags.length) {
        queryString += `&tags=${tags.join()}`;
    }

    fetch(`/search${queryString}`)
        .then((response) => response.json() as Promise<Result[]>)
        .then((results) => callback(results));
}

type Query = {
    query: string;
    tags?: string[];
    assemble: (includeTags: boolean) => string;
};

const query: Query = {
    query: "Ember",
    tags: ["javascript"],
    assemble(includeTags = false) {
        let query = `?query=${this.query}`;
        if (includeTags && typeof this.tags !== "undefined") {
            query += `&${this.tags.join(",")}`;
        }
        return query;
    },
};
