import { Modal, Button } from "react-bootstrap";
import  * as eventBus from "../../../../common/eventBus";

export const EVENTS = {
	CLOSE: "createChatModal:close"
}
type Props = {
	readonly show: boolean;
}
export default function CreateChatModal(props: Props): JSX.Element {
	const onClose = () => {
		eventBus.trigger(EVENTS.CLOSE, {})
	}
	return (
		<Modal
			show={props.show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onClick={onClose}>
				<Modal.Title id="contained-modal-title-vcenter">
					Modal heading
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Centered Modal</h4>
				<p>
					Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
					dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
					consectetur ac, vestibulum at eros.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}