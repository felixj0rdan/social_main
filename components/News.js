import Link from 'next/link'


function News({ title, description, url, urlToImage }) {
    return (
    <div>
        <div className="text-blue-400 p-4">
            <Link href={url}>{title}</Link>
            {/* <h1 className="text-blue-400 p-4">{title}</h1> */}
            {/* <img src={urlToImage} className="w-8 h-6"/> */}
        </div>
            <p>{description}</p>
    </div>
    )
}

export default News
