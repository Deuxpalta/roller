import { CardText } from "react-bootstrap";

function NotFound() {
    return (
        <CardText className="text-center my-5">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </CardText>
    );
}

export default NotFound;