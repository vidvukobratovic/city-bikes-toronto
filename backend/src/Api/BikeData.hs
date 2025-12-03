-- Api/BikeData.hs
module Api.BikeData where

import Data.Aeson (FromJSON, ToJSON, parseJSON, toJSON, withObject, object, (.=), (.:), (.:?))
import Data.Text (Text)
import GHC.Generics (Generic)

-- Station data types matching the frontend interfaces
data Extra = Extra
  { address :: Maybe Text
  , altitude :: Maybe Double
  , ebikes :: Int
  , hasEbikes :: Bool
  , lastUpdated :: Maybe Int
  , normalBikes :: Maybe Int
  , payment :: Maybe [Text]
  , paymentTerminal :: Maybe Bool
  , renting :: Maybe Int
  , returning :: Maybe Int
  , slots :: Maybe Int
  , uid :: Maybe Text
  }
  deriving (Show, Eq, Generic)

instance FromJSON Extra where
  parseJSON = withObject "Extra" $ \o -> Extra
    <$> o .:? "address"
    <*> o .:? "altitude"
    <*> o .: "ebikes"
    <*> o .: "has_ebikes"
    <*> o .:? "last_updated"
    <*> o .:? "normal_bikes"
    <*> o .:? "payment"
    <*> o .:? "payment-terminal"
    <*> o .:? "renting"
    <*> o .:? "returning"
    <*> o .:? "slots"
    <*> o .:? "uid"

instance ToJSON Extra where
  toJSON e = toJSON $ object
    [ "address" .= address e
    , "altitude" .= altitude e
    , "ebikes" .= ebikes e
    , "has_ebikes" .= hasEbikes e
    , "last_updated" .= lastUpdated e
    , "normal_bikes" .= normalBikes e
    , "payment" .= payment e
    , "payment-terminal" .= paymentTerminal e
    , "renting" .= renting e
    , "returning" .= returning e
    , "slots" .= slots e
    , "uid" .= uid e
    ]

data Station = Station
  { emptySlots :: Maybe Int
  , extra :: Extra
  , freeBikes :: Maybe Int
  , stationId :: Text
  , latitude :: Double
  , longitude :: Double
  , name :: Text
  , timestamp :: Maybe Text
  }
  deriving (Show, Eq, Generic)

instance FromJSON Station where
  parseJSON = withObject "Station" $ \o -> Station
    <$> o .:? "empty_slots"
    <*> o .: "extra"
    <*> o .:? "free_bikes"
    <*> o .: "id"
    <*> o .: "latitude"
    <*> o .: "longitude"
    <*> o .: "name"
    <*> o .:? "timestamp"

instance ToJSON Station where
  toJSON s = toJSON $ object
    [ "empty_slots" .= emptySlots s
    , "extra" .= extra s
    , "free_bikes" .= freeBikes s
    , "id" .= stationId s
    , "latitude" .= latitude s
    , "longitude" .= longitude s
    , "name" .= name s
    , "timestamp" .= timestamp s
    ]

data Location = Location
  { city :: Text
  , country :: Text
  , locationLatitude :: Double
  , locationLongitude :: Double
  }
  deriving (Show, Eq, Generic)

instance FromJSON Location where
  parseJSON = withObject "Location" $ \o -> Location
    <$> o .: "city"
    <*> o .: "country"
    <*> o .: "latitude"
    <*> o .: "longitude"

instance ToJSON Location where
  toJSON l = toJSON $ object
    [ "city" .= city l
    , "country" .= country l
    , "latitude" .= locationLatitude l
    , "longitude" .= locationLongitude l
    ]

data Network = Network
  { company :: Maybe [Text]
  , gbfsHref :: Maybe Text
  , href :: Maybe Text
  , networkId :: Text
  , location :: Location
  , networkName :: Text
  , stations :: [Station]
  }
  deriving (Show, Eq, Generic)

instance FromJSON Network where
  parseJSON = withObject "Network" $ \o -> Network
    <$> o .:? "company"
    <*> o .:? "gbfs_href"
    <*> o .:? "href"
    <*> o .: "id"
    <*> o .: "location"
    <*> o .: "name"
    <*> o .: "stations"

instance ToJSON Network where
  toJSON n = toJSON $ object
    [ "company" .= company n
    , "gbfs_href" .= gbfsHref n
    , "href" .= href n
    , "id" .= networkId n
    , "location" .= location n
    , "name" .= networkName n
    , "stations" .= stations n
    ]

data ApiResponse = ApiResponse
  { network :: Network
  }
  deriving (Show, Eq, Generic)

instance FromJSON ApiResponse where
  parseJSON = withObject "ApiResponse" $ \o -> ApiResponse
    <$> o .: "network"

instance ToJSON ApiResponse where
  toJSON r = toJSON $ object
    [ "network" .= network r
    ]

