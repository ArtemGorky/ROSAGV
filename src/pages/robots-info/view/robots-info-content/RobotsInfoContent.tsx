import { IntlProps } from "../../types";
import { observer } from "mobx-react-lite";
import { useDeviceDetect } from "@/hooks";
import { WithRobotsInfoData } from "../../hoc/WithRobotsInfoData";

export const RobotsInfoContent = observer(({ intl }: IntlProps) => {

    const { isMobile } = useDeviceDetect();

    return <WithRobotsInfoData intl={intl} isMobile={isMobile} />
});