-- Config.hs
module Config where

import Data.Text (Text)

-- Server configuration
data Config = Config
  { port :: Int
  , bikeApiUrl :: Text
  }

defaultConfig :: Config
defaultConfig = Config
  { port = 8080
  , bikeApiUrl = "https://api.citybik.es/v2/networks/bixi-toronto"
  }

