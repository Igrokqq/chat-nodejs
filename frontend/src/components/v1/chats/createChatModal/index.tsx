import { ReactPropTypes, Props as ReactProps, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { EVENTS as CREATE_CHAT_FORM_EVENTS} from "../createChatForm/presenter";
import  * as eventBus from "../../../../common/eventBus";
import styles from "./createChatModal.module.css";

export const EVENTS = {
	CLOSE: "createChatModal:close"
}
type Props = ReactProps<ReactPropTypes> & {
	readonly show: boolean;
}
export default function ModaCreateChatModal(props: Props): JSX.Element {
	const onClose = () => {
		eventBus.trigger(EVENTS.CLOSE, {})
	}
	useEffect(() => {
		eventBus.on(CREATE_CHAT_FORM_EVENTS.SUBMIT, onClose);
		return (): void => {
			eventBus.off(CREATE_CHAT_FORM_EVENTS.SUBMIT, onClose);
		}
	}, [])

	return (
		<Modal
			show={props.show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header
			  className={styles.closeButton}
				onClick={onClose}
				closeButton
			></Modal.Header>
			<Modal.Body>
				{props.children}
			</Modal.Body>
		</Modal>
	)
}