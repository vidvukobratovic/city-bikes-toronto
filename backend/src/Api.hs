-- Api.hs
module Api where

import Control.Monad.IO.Class (liftIO)
import Data.Aeson (FromJSON, ToJSON, eitherDecode, object, (.=))
import Data.ByteString.Lazy (ByteString)
import Data.ByteString.Lazy.Char8 (pack)
import Data.Text (Text, unpack)
import GHC.Generics (Generic)
import Network.HTTP.Client (Manager, newManager, defaultManagerSettings, parseRequest, httpLbs, responseBody)
import Network.HTTP.Client.TLS (tlsManagerSettings)
import Network.Wai (Application)
import Servant
import Servant.CORS
import Api.BikeData (ApiResponse)
import Config (Config(..), defaultConfig)

-- API type definition
type BikeAPI =
  "api" :> "bikes" :> "toronto" :> Get '[JSON] ApiResponse
  :<|> "api" :> "health" :> Get '[JSON] HealthResponse

data HealthResponse = HealthResponse
  { status :: String
  , message :: String
  }
  deriving (Show, Eq, Generic)

instance ToJSON HealthResponse where
  toJSON h = object
    [ "status" .= status h
    , "message" .= message h
    ]

-- API implementation
bikeAPI :: Proxy BikeAPI
bikeAPI = Proxy

server :: Manager -> Config -> Server BikeAPI
server manager config = getTorontoBikes manager config
  :<|> getHealth

getTorontoBikes :: Manager -> Config -> Handler ApiResponse
getTorontoBikes manager config = do
  -- Fetch from external API
  request <- liftIO $ parseRequest (unpack $ bikeApiUrl config)
  response <- liftIO $ httpLbs request manager
  case eitherDecode (responseBody response) of
    Left err -> throwError $ err500 { errBody = pack $ "Failed to parse API response: " ++ err }
    Right data_ -> return data_

getHealth :: Handler HealthResponse
getHealth = return $ HealthResponse "ok" "City Bikes Backend is running"

-- CORS configuration
corsPolicy :: CorsResourcePolicy
corsPolicy = simpleCorsResourcePolicy
  { corsOrigins = Just (["http://localhost:5173", "http://localhost:3000"], True)
  , corsMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  , corsRequestHeaders = ["Content-Type", "Authorization"]
  }

app :: Manager -> Config -> Application
app manager config = cors (const $ Just corsPolicy) $ serve bikeAPI (server manager config)

