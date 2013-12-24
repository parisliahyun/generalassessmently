class AddGooglekeyToSpreadsheets < ActiveRecord::Migration
  def change
    change_table :spreadsheets do |t|
      t.string :google_key
    end
  end
end
