import { imgUrl } from "../utils";

export default function Error(){

    return (
        <div>
            <img src={imgUrl('html404.jpg')} alt="Error 404!"/>
        </div>
    )
}