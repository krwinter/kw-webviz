#!/bin/bash

echo "Generating PSF and uploading to s3"
url=$(curl --data "pageName=marketplaceTransactions" http://pk01.cornell.mgmt/api/download/wk)
echo "$url"
echo "PDF generation complete."
#echo "File available at: " + $url


