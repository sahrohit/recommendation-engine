import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ToggleTheme = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			size="lg"
			variant="ghost"
			aria-label="open menu"
			icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
		></IconButton>
	);
};

export default ToggleTheme;
