import React, { useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./forecast.css";

function Forecast() {
   
    return (
     <div>
        <PowerBIEmbed
          embedConfig={{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: 'f23cc4cd-eb06-4f96-8bf7-fb845177bac8',
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=f23cc4cd-eb06-4f96-8bf7-fb845177bac8&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
            accessToken: '',
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
                }
              },
              background: models.BackgroundType.Transparent,
              navContentPaneEnabled: false,
            }
          }}

          eventHandlers={
            new Map([
              ['loaded', function () { console.log('Report loaded'); }],
              ['rendered', function () { console.log('Report rendered'); }],
              ['error', function (event) { console.log(event.detail); }]
            ])
          }

          cssClassName={"Embed-container"}

          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />

     </div>
    );
  }

  export default Forecast;