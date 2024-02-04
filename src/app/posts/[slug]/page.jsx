import styles from "./singlePage.module.css"
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
    const res = await fetch(
        `http://localhost:3000/api/posts/${slug}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
};


const SinglePage = async ({params}) => {
    const {slug} = params;
    const data = await getData(slug)
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <a href="/" className={styles.top}>
                    <div className={styles.back}>

                        <p><span className={styles.baack}>&#8617;</span> back to home</p>
                    </div>
                </a>
                <div className={styles.textContainer}>

                           <span className={styles.date}>
                                monday, 18 september 2023
                            </span>
                    <h2 className={styles.title}> {data?.title}</h2>

                    <div className={styles.user}>
                        {data?.user?.image && <div className={styles.userImageContainer}>
                            <Image src={data.user.image} alt="" fill className={styles.avatar}/>
                        </div>}
                        <a href="https://twitter.com/MrNiloyFarhan" target="_blank">
                            <div className={styles.userTextContainer}>
                            <span className={styles.username}>{data?.user.name}</span>
                                <span className={styles.lin}>
                                @niloy-farhan
                            </span>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
            {data?.image && <div className={styles.imageContainer}>
                <Image src={data?.image} alt="" fill className={styles.image}/>
            </div>}
            <div className={styles.content}>
                <div className={styles.post}>
                    <div className={styles.description} dangerouslySetInnerHTML={ {__html: data?.desc} }/>
                </div>
                <Comments />

            </div>
        </div>
    )
}

export default SinglePage