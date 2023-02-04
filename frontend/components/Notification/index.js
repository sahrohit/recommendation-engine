import {
	Center,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiBell } from "react-icons/fi";

const Notification = () => {
	return (
		<Popover isLazy placement="bottom-end">
			<PopoverTrigger>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader>Notifications</PopoverHeader>
				<PopoverBody h={200}>
					<Center h="full">
						<Text>You`re all caught up</Text>
					</Center>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default Notification;
