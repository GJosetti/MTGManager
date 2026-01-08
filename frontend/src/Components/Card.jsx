

function Card({color, title})
{

    const styles = {

        card: {
            border: "2px solid #ccc ",
            borderRadius: "8px",
            backgroundColor:color,
            width:"700px",
            height:"500px",
            boxShadow: "0px 8px 12px rgba(0,0,0,0.25)",
        },
        title:{
            fontFamily:"roboto",
            fontSize: "40px",
            color: "black"

        }
    }


        return(

    <div style={styles.card}>
        <h1 style={styles.title}>{title}</h1>

    </div>

)





}

export default Card;