
if Rails.env == "development"
  # set credentials from ENV hash
  S3_CONFIG = YAML.load_file("#{::Rails.root}/config/s3.yml")[::Rails.env]

end