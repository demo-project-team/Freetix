import { Vendor } from "@/Types/types";
import { Mail, Phone } from "lucide-react";
import styled from "styled-components";

const BackCard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <img
                src={vendor.imageUrl || "/next.svg"}
                className="w-full h-[80px] object-cover rounded"
                alt="vendor"
              />
              <strong>{vendor.name}</strong>
              <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {" "}
                  <Mail size={16} />
                </div>
                <div>{vendor.email}</div>
              </div>
               <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {" "}
                  <Phone size={16} />
                </div>
                    <p>{vendor.phone || "Утас байхгүй байна."}</p>
              </div>
              <p>{vendor.address?.street || "Хаяг оруулаагүй байна."}</p>
              </div>
              {/* <p>
                {vendor.createdAt
                  ? `Бүртгэгдсэн: ${vendor.createdAt.toString().split("T")[0]}`
                  : "Бүртгэгдээгүй байна."}
              </p> */}
              {/* <p>
                {vendor.rooms.filter((room) => room.type === "VIP")[0]
                  ?.pcPricePerHour || "Үнэ оруулаагүй байна."}
              </p>
              <p>
                {vendor.rooms.filter((room) => room.type === "VVIP")[0]
                  ?.pcPricePerHour || "Үнэ оруулаагүй байна."}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default BackCard;

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    height: 254px;
  }

  .content {
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
    position: relative;
  }

  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: " ";
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #03045e,
      #0077b6,
      #caf0f8,
      #03045e,
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    z-index: 1;
    text-align: center;
    padding: 10px;
    font-size: 13px;
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;
