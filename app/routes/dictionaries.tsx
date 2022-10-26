import { Link, Outlet } from "@remix-run/react";
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
            <Link to="list/admin/new" className="text-blue-500 underline">
              <span className="material-icons blueSky">add_circle</span>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Outlet/>
    </div>
  );
}

