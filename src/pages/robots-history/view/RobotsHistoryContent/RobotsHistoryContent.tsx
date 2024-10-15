import { IntlProps } from "@/shared/types"
import { FilterDropdown } from "../filter-dropdown/FilterDropdown"
import { RobotHistoryPagination } from "../robot-history-pagination/RobotHistoryPagination"
import { WithRobotsHistoryData } from "../../hoc/WithRobotsHistoryData"
import { useDeviceDetect } from "@/hooks"


export const RobotsHistoryContent = ({ intl }: IntlProps) => {

    const { isMobile } = useDeviceDetect();

    return (
        <>
            <FilterDropdown intl={intl} />
            <RobotHistoryPagination intl={intl} />
            <WithRobotsHistoryData intl={intl} isMobile={isMobile} />
        </>
    )
}