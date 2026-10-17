type PageHeadingProps = {
    title: string;
    description: string;
}

export default function PageHeading({ title, description }: PageHeadingProps) {
    return (
        <section className="text-center p-4 mb-4 border-b border-white mx-auto">
            <h1 className="text-4xl m-2 font-bold text-white">{title}</h1>
            <p className="text-lg m-2 text-white">{description}</p>
        </section>
    );
}