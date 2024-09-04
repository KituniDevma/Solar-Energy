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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYWFjMGM1NjQtNmM1ZS00YjA1LThkYzMtNDA4MDg3Zjc3Zjc2LyIsImlhdCI6MTcyNTQzNjYzMiwibmJmIjoxNzI1NDM2NjMyLCJleHAiOjE3MjU0NDA3OTMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFlN1Vua0ZQbEJnaHoxOEc0RXJKd3dLTEdkeUVuLzRsUkdtdmwxRG9CWmF4TmlHQldXdWNnYWpETWsrUDhad3dwIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRGV2bWEiLCJnaXZlbl9uYW1lIjoiS2l0aHVuaSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjI0MDE6ZGQwMDoxMDoyMDplMGNjOmRkOGI6NjkwODo1NTQ5IiwibmFtZSI6IktpdGh1bmkgRGV2bWEiLCJvaWQiOiIwYTRkNjE3ZS1mZDU2LTQ2OTgtOWRiOS1jMWQ0MDAxODhhNDkiLCJwdWlkIjoiMTAwMzIwMDFGQjFCRjg5MSIsInJoIjoiMC5BWElBWk1YQXFsNXNCVXVOdzBDQWhfZF9kZ2tBQUFBQUFBQUF3QUFBQUFBQUFBRERBS2cuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiWFhKa29fNFpGZHNfYjRxal9xcDg1LXVENFZLTGxtN01ZTkFiWUpTTXRsRSIsInRpZCI6ImFhYzBjNTY0LTZjNWUtNGIwNS04ZGMzLTQwODA4N2Y3N2Y3NiIsInVuaXF1ZV9uYW1lIjoid2lja3JhbWFzaW5naGV3bGtkZGEuMjFAdW9tLmxrIiwidXBuIjoid2lja3JhbWFzaW5naGV3bGtkZGEuMjFAdW9tLmxrIiwidXRpIjoiUjVFQzZJZktURWE3c1VDQk50S1VBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMjAifQ.EnQyQmq5T6u_h6-bpQw8lWQZFu9KEz95Eej2rTvF3TJgHYnEknO8QNYMXHqVSz8LQxXskpaug0OW2OvfRQj8aTpveitpt9fGfjLb-yhp33kcOqkM3pZPM8g2-o0MhiyFgnHDIKf8EoCESj1L2QGrRYdMft_NB-UPTKDbJMwt7Ag2dtOsSi0r9f0_4ggIlxPcgBlnOMFOS7ju6EMCSXcV-io7aqgMUOykIxlggfrKyz5HrJrFiHn41PQi9krRM9_sCYdetW_mfRfA7PTTvOqqkJj9ckt2WgBW-8iE3B1qY19mrMQ152cyu8FV5eZZDbgWpFClfV6DTVmU7ybcB4_D3w',
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
            window.Report = embeddedReport;
          }}
        />

     </div>
    );
  }

  export default Forecast;