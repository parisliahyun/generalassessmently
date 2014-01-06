DataMapper.setup(:default, ENV['DATABASE_URL'] || 'postgres://localhost/GeneralAssessmently_development')

class Course
  extend ActiveModel::Naming
  include DataMapper::Resource
  property :id, Serial
  property :title, String, :unique => true
  has n, :spreadsheets
  # accepts_nested_attributes_for :spreadsheets
end

Course.model_name
DataMapper.finalize
DataMapper.auto_upgrade!

