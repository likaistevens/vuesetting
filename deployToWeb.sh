echo 开始执行npm run build

npm run build

echo 打包完成
echo 正在拷贝到Web...

currentDir=$(cd "$(dirname "$0")";pwd)
webProjectDir="/Users/sunchangtan/Desktop/开发/JavaWorkspace/jbi-starter/src/main/resources"
sourceDir=$currentDir"/dist"
# echo $currentDir
# echo $sourceDir

targetWebStaticDir=$webProjectDir"/static"
targetWebTemplatesDir=$webProjectDir"/templates"

echo "远程Web目录："$targetWebStaticDir

sudo rm -rf $targetWebStaticDir"/css"
sudo rm -rf $targetWebStaticDir"/fonts"
sudo rm -rf $targetWebStaticDir"/img"
sudo rm -rf $targetWebStaticDir"/js"

sudo mkdir $targetWebStaticDir"/css"
sudo mkdir $targetWebStaticDir"/fonts"
sudo mkdir $targetWebStaticDir"/img"
sudo mkdir $targetWebStaticDir"/js"

sudo cp -r $sourceDir"/css" $targetWebStaticDir
sudo cp -r $sourceDir"/fonts" $targetWebStaticDir
sudo cp -r $sourceDir"/img" $targetWebStaticDir
sudo cp -r $sourceDir"/js" $targetWebStaticDir
sudo cp $sourceDir"/index.html" $targetWebTemplatesDir"/index.html"

echo 打包部署成功
