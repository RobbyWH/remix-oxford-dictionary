import { Outlet } from "@remix-run/react";
import Image from "remix-image";

const OXFORD_DICTIONARY_LOGO = "https://www.seekpng.com/png/full/55-555980_view-definition-in-oxford-dictionaries-english-oxford-living.png"

export default function DictionariesPage () {
  return (
    <div>
      <div className="p-5">
        <div className="flex">
          <div className="flex-1">
            <Image
              src={OXFORD_DICTIONARY_LOGO}
              responsive={[
                {
                  size: {
                    width: 175,
                    height: 52,
                  },
                },
              ]}
            />
          </div>
          <div className="self-center">
            <span className="material-icons blueSky">add_circle</span>
          </div>
        </div>
      </div>
      <hr />
      <Outlet/>
    </div>
  );
}

