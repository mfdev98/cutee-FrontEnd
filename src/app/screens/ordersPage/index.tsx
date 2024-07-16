import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
   const [value, setValue] = useState("1");
   const handleChange = (e: SyntheticEvent, newValue: string) => {
      setValue(newValue);
   };

   return (
      <div className={"order-page"}>
         <Container className={"order-container"}>
            <Stack className={"order-left"}>
               <TabContext value={value}>
                  <Box className={"order-nav-frame"}>
                     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                           value={value}
                           onChange={handleChange}
                           aria-label="basic tabs example"
                           className={"table_list"}
                        >
                           <Tab label="PAUSED ORDERS" value={"1"} />
                           <Tab label="PROCESS ORDERS" value={"2"} />
                           <Tab label="FINISHED ORDERS" value={"3"} />
                        </Tabs>
                     </Box>
                  </Box>
                  <Stack className={"order-main-content"}>
                     <PausedOrders />
                     <ProcessOrders />
                     <FinishedOrders />
                  </Stack>
               </TabContext>
            </Stack>

            <Stack className={"order-right"}>
               <Box className={"order-info-box"}>

                  <Box className={"member-box"}>
                     <div className={"order-user-img"}>
                        <img
                           src={"/icons/default-user.svg"}
                           className={"order-user-avatar"}
                        />

                        <div className={"order-user-icon-box"}>
                           <img
                              src={"/icons/user-badge.svg"}
                              className={"order-user-prof-img"}
                           />
                        </div>
                     </div>
                     <span className={"order-user-name"}>Joseph</span>
                     <span className={"order-user-prof"}>User</span>
                  </Box>
                  <Box className={"liner"}></Box>
                  <Box className={"order-user-address"}>
                     <div style={{ display: "flex" }}>
                        <LocationOnIcon />
                     </div>
                     <div className={"spec-address-txt"}>
                        South Korea, Chuncheon
                     </div>
                  </Box>
               </Box>

               <Box className={"order-info-box"}>
                  <input
                     type={"text"}
                     placeholder={"Card number : 0000 0000 0000 0000"}
                     className={"card-input"}
                  />
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                     }}
                  >
                     <input
                        type={"text"}
                        placeholder={"mm / yy"}
                        className={"card-half-input"}
                     />
                     <input
                        type={"text"}
                        placeholder={"CVV : 000"}
                        className={"card-half-input"}
                     />
                  </div>
                  <input
                     type={"text"}
                     placeholder={"full name"}
                     className={"card-input"}
                  />
                  <div className={"cards-box"}>
                     <img src={"/icons/western-card.svg"} />
                     <img src={"/icons/master-card.svg"} />
                     <img src={"/icons/paypal-card.svg"} />
                     <img src={"/icons/visa-card.svg"} />
                  </div>
               </Box>
            </Stack>
         </Container>
      </div>
   )
}