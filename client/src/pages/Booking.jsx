import Bg2 from "../components/Bg2";
import Comuser from "../components/ui/Comuser";
import Checkin from "../components/ui/Checkin";
import Checkout from "../components/ui/Checkout";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function Booking() {
  return (
    <>
      <Bg2 />
      <section className="w-full h-full px-2.5 mx-auto md:px-20 my-5">
        <div className="border border-zinc-300">
          <div className="grid grid-cols-3">
            <div className="border border-zinc-300">
              <Comuser />
            </div>
            <div className="border border-zinc-300 p-2">
              <Checkin />
            </div>
            <div className="border border-zinc-300 p-2">
              <Checkout />
            </div>
          </div>
          <div className="p-2 my-5">
            <p className="uppercase text-xl fontsemibold">Select room type</p>
            <div className="grid grid-cols-3 gap-10 my-5">
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Room's type
                    </InputLabel>
                    <NativeSelect
                      defaultValue={'single'}
                      inputProps={{
                        name: "Room's type",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={'Single'}>Single</option>
                      <option value={'Double'}>Double</option>
                      <option value={'Suit'}>Suit</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </div>
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      How many room do you want ? 
                    </InputLabel>
                    <NativeSelect
                      defaultValue={1}
                      inputProps={{
                        name: "Room's type",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </div>
              <div className=" text-md">Conclusion</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
