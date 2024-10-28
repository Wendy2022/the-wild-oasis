import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    stays,
    isLoading: isLoading2,
    confirmedStays,
    numDays,
  } = useRecentStays();
  // console.log(stays);
  const { cabins, isLoading: isLoadings3 } = useCabins();
  //console.log("cabins:", cabins);
  //  检查加载状态
  if (isLoading1 || isLoading2 || isLoadings3) {
    <Spinner />;
  }
  // 检查数据完整性
  if (!cabins || !bookings || !stays) {
    return <div>Error loading dashboard data. Please try again.</div>;
  }
  //console.log("bookings:", bookings);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
