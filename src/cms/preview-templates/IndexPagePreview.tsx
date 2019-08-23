import React from "react";
import { ProjectRollContainer } from "../../containers/ProjectRollContainer";
import { Studio, IStudioProps } from "../../components/Studio";
import { IPagePreviewProps } from "./CookiePagePreview";
export const IndexPagePreview: React.FC<IPagePreviewProps> = ({
  entry
}: IPagePreviewProps) => {
  const data: IStudioProps = entry.getIn(["data"]).toJS();
  if (
    data &&
    data.description &&
    data.title &&
    data.phone &&
    data.email &&
    data.address &&
    data.social[0]
  ) {
    return (
      <div>
        <ProjectRollContainer />
        <Studio
          title={data.title}
          description={data.description}
          phone={data.phone}
          email={data.email}
          address={data.address}
          social={data.social}
        />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
