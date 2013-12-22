class Assessment < ActiveRecord::Base
  validates :url, presence: true
end